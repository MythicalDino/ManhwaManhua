import React from "react";
import {
  MessageCircle,
  Users,
  ExternalLink,
} from "lucide-react";

const CommentsOnManga = ({ manga, isDark = true }) => {
  const repliesCount = manga?.rating?.comments?.repliesCount ?? 0;

  return (
    <div className="w-full h-full">
      <div className={`rounded-lg p-6 ${isDark ? "bg-gray-800/50 border-gray-700/50" : "bg-gray-50 border-gray-200"} border`}>
        <div className="text-center py-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <MessageCircle className={`w-16 h-16 ${isDark ? "text-purple-400/50" : "text-purple-600/50"}`} />
              <div className={`absolute -top-2 -right-2 w-6 h-6 ${isDark ? "bg-yellow-500/80" : "bg-yellow-400/80"} rounded-full flex items-center justify-center`}>
                <Users className={`w-3 h-3 ${isDark ? "text-white" : "text-gray-900"}`} />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className={`text-xl font-bold ${isDark ? "text-white/80" : "text-gray-900/80"}`}>
                Comments Available
              </h3>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {repliesCount > 0 
                  ? `${repliesCount} comments available for this manga`
                  : "No comments available for this manga"
                }
              </p>
            </div>

            <div className={`${isDark ? "bg-purple-900/30 border-purple-500/30" : "bg-purple-100/30 border-purple-400/30"} rounded-lg p-4 border max-w-md`}>
              <p className={`text-sm ${isDark ? "text-purple-300" : "text-purple-700"}`}>
                Comments feature has been simplified for better performance. 
                Visit MangaDx directly for community discussions.
              </p>
            </div>

            <a
              href="https://mangadx.org"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isDark 
                  ? "bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30" 
                  : "bg-purple-100 hover:bg-purple-200 text-purple-700 border border-purple-300"
              }`}
            >
              <ExternalLink className="w-4 h-4" />
              Visit MangaDx Forums
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CommentsOnManga);
