import { useState } from "react";
import React from "react";
import { BlogArticle } from "../types";
import { CLINIC_BLOGS } from "../data";
import { 
  Search, Calendar, Clock, ThumbsUp, BookOpen, 
  ArrowLeft, Tag, Share2, Sparkles, Bookmark, Eye 
} from "lucide-react";

export default function BlogView() {
  
  // Articles state to support localized liking
  const [articles, setArticles] = useState<BlogArticle[]>(CLINIC_BLOGS);
  
  // Active category filter state
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  
  // Active search state
  const [searchQuery, setSearchQuery] = useState("");

  // Bookmark tags ids
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  // Detailed article modal / expand view
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);

  // Categories list
  const categories = ["Cardiology", "Pediatrics", "Dermatology", "Lifestyle", "General Health"];

  // Filter article collections
  const filteredArticles = articles.filter(art => {
    const matchesCategory = selectedCategory ? art.category === selectedCategory : true;
    const matchesSearch = searchQuery 
      ? art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) || 
        art.content.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  // Handle Like Increment
  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid expanding card
    setArticles(prev => prev.map(art => {
      if (art.id === id) {
        const hasLikedAlready = art.hasLiked;
        return {
          ...art,
          likes: hasLikedAlready ? art.likes - 1 : art.likes + 1,
          hasLiked: !hasLikedAlready
        };
      }
      return art;
    }));
  };

  // Toggle bookmarking
  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]
    );
  };

  // Handle Share simulation
  const handleShare = (title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.href}#blog`);
      alert(`\"${title}\" link copied to clinical clipboard!`);
    } else {
      alert("Sharing link successfully compiled in caching.");
    }
  };

  return (
    <div className="space-y-10 py-4" id="blogs-view-container">
      
      {/* 1. BLOG ARTICLE DETAIL SCENE */}
      {activeArticle ? (
        <div className="animate-scale-up space-y-6" id="blog-detail-scene">
          {/* Back button */}
          <button
            id="back-to-blogs-list-btn"
            onClick={() => {
              // Sync loaded like adjustments back to detail before closing
              const matchingArt = articles.find(a => a.id === activeArticle.id);
              if (matchingArt) setActiveArticle(matchingArt);
              setActiveArticle(null);
            }}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 px-4 rounded-xl text-xs font-semibold select-none border border-slate-200 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Wellness Hub
          </button>

          {/* Full Article Card visual */}
          <article className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
            {/* Banner */}
            <div className="h-64 sm:h-80 md:h-96 w-full bg-slate-100 relative">
              <img 
                src={activeArticle.imageUrl} 
                alt={activeArticle.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest font-mono px-3 py-1 rounded-full">
                  {activeArticle.category}
                </span>
                <h1 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-tight">
                  {activeArticle.title}
                </h1>
              </div>
            </div>

            {/* Author Meta details row */}
            <div className="p-6 sm:p-8 bg-slate-50 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
                  <img src={activeArticle.author.avatar} alt={activeArticle.author.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm leading-tight">{activeArticle.author.name}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">{activeArticle.author.role}</p>
                </div>
              </div>

              <div className="flex gap-4 text-xs font-semibold text-slate-500 font-mono">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>{activeArticle.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{activeArticle.readTime}</span>
                </div>
              </div>
            </div>

            {/* Article Content blocks */}
            <div className="p-6 sm:p-10 max-w-4xl mx-auto">
              <div className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed space-y-6 font-medium">
                {/* Process the manual custom text spacing */}
                {activeArticle.content.split("\n\n").map((para, pIdx) => {
                  if (para.startsWith("###")) {
                    return (
                      <h3 key={pIdx} className="text-slate-900 font-extrabold text-lg pt-4 pb-1 border-b border-slate-100 font-sans tracking-tight">
                        {para.replace("###", "").trim()}
                      </h3>
                    );
                  }
                  if (para.startsWith("-") || para.startsWith("* ")) {
                    return (
                      <ul key={pIdx} className="list-disc pl-6 space-y-2 text-slate-650">
                        {para.split("\n").map((li, lIdx) => (
                          <li key={lIdx}>{li.replace(/^[\s*-]+/, "").trim()}</li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={pIdx} className="text-slate-600 leading-relaxed">
                      {para.startsWith("*") && para.endsWith("*") ? (
                        <em className="text-blue-700 font-semibold block bg-blue-50/50 p-4 border-l-4 border-blue-600 rounded-r-xl">{para.replace(/\*/g, "")}</em>
                      ) : (
                        para.trim()
                      )}
                    </p>
                  );
                })}
              </div>

              {/* Bottom stats row */}
              <div className="flex justify-between items-center pt-8 mt-12 border-t border-slate-150">
                <button
                  onClick={(e) => handleLike(activeArticle.id, e)}
                  id="detail-like-btn"
                  className={`flex items-center gap-1.5 text-xs font-bold py-2.5 px-5 rounded-xl transition-all cursor-pointer border ${
                    activeArticle.hasLiked 
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-50" 
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <ThumbsUp className="w-4 h-4 text-inherit" />
                  <span>{activeArticle.likes} Likes</span>
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={(e) => toggleBookmark(activeArticle.id, e)}
                    id="detail-bookmark-btn"
                    className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-slate-50 cursor-pointer"
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarkedIds.includes(activeArticle.id) ? "fill-blue-600 text-blue-600" : ""}`} />
                  </button>
                  <button
                    onClick={(e) => handleShare(activeArticle.title, e)}
                    id="detail-share-btn"
                    className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-slate-50 cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      ) : (
        /* 2. PRIMARY ARTICLES GRID AND SEARCH FILTERS */
        <div className="space-y-8 animate-fade-in" id="blog-hub-panel">
          
          {/* Blog Welcome Headline */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1 bg-indigo-50 border border-indigo-100/50 px-3 py-1 rounded-full text-indigo-700 font-sans text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-indigo-600" />
              Living Well Library
            </div>
            <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-none">
              Wellness & Healthcare Blog
            </h1>
            <p className="text-slate-500 text-sm">
              Authored directly by our clinic specialists. Search wellness topics designed to support your daily wellness habits.
            </p>
          </div>

          {/* Search bar & Categories row */}
          <div className="bg-white border border-slate-100 p-4 rounded-3xl shadow-sm space-y-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                id="blog-search-query-input"
                type="text"
                placeholder="Search health tips, vaccines, skin barriers, cholesterol swap..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 focus:bg-slate-100/30 pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 text-sm focus:outline-none"
              />
            </div>

            {/* Category filter pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-widest mr-2">Categories:</span>
              <button
                onClick={() => setSelectedCategory("")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer border transition-all ${
                  selectedCategory === ""
                    ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                }`}
              >
                All Topics
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer border transition-all ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-50"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {cat || "General Health"}
                </button>
              ))}
            </div>
          </div>

          {/* Articles list grid */}
          {filteredArticles.length === 0 ? (
            <div className="p-12 text-center bg-slate-50 rounded-2xl border border-slate-150">
              <span className="text-2xl block mb-2">📚</span>
              <h4 className="font-bold text-slate-700 text-sm">No Medical Articles Found</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                No articles matched your search query. Try clearing filters or search simpler descriptors.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="articles-grid-list">
              {filteredArticles.map((art) => {
                const isBookmarked = bookmarkedIds.includes(art.id);
                return (
                  <div
                    key={art.id}
                    onClick={() => setActiveArticle(art)}
                    id={`blog-card-${art.id}`}
                    className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:scale-101 hover:border-slate-200 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    {/* Media */}
                    <div className="relative h-48 bg-slate-50">
                      <img src={art.imageUrl} alt={art.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-bold text-blue-600 font-mono uppercase tracking-widest">
                        {art.category}
                      </div>
                      <button
                        onClick={(e) => toggleBookmark(art.id, e)}
                        className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full text-slate-600 hover:text-blue-650 transition-colors shadow-sm"
                        id={`bookmark-btn-${art.id}`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-blue-600 text-blue-600" : ""}`} />
                      </button>
                    </div>

                    {/* Meta info */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex gap-4 text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {art.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {art.readTime}
                          </span>
                        </div>
                        <h3 className="font-sans font-extrabold text-slate-900 text-base leading-snug hover:text-blue-600 transition-colors">
                          {art.title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed lines-2">
                          {art.excerpt}
                        </p>
                      </div>

                      {/* Footer: Author details and likes */}
                      <div className="border-t border-slate-100 pt-3.5 flex justify-between items-center bg-slate-50/50 p-2.5 rounded-xl border border-dashed border-slate-100">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200">
                            <img src={art.author.avatar} alt={art.author.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <span className="font-bold text-slate-800 text-[11px] block leading-none">{art.author.name}</span>
                            <span className="text-[9px] text-slate-400 font-medium mt-0.5 block">{art.author.role}</span>
                          </div>
                        </div>

                        <div className="flex gap-1.5 shrink-0">
                          <button
                            onClick={(e) => handleLike(art.id, e)}
                            id={`like-btn-art-${art.id}`}
                            className={`flex items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] cursor-pointer font-bold border ${
                              art.hasLiked 
                                ? "bg-blue-600 text-white border-blue-600" 
                                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            <ThumbsUp className="w-3 h-3 text-inherit" />
                            <span>{art.likes}</span>
                          </button>
                          <button
                            onClick={(e) => handleShare(art.title, e)}
                            id={`share-btn-art-${art.id}`}
                            className="p-1 px-2.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                          >
                            <Share2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
