import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';

export function CustomerReview() {
  return (
    <div className="bg-[#1c1e26] p-6 rounded-2xl border border-white/5 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-bold">Customer Review</h3>
        <button className="text-blue-400 text-sm font-medium hover:underline">View All</button>
      </div>
      
      <div className="space-y-6">
        <div className="border-b border-white/5 pb-6">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden">
                <img src={`https://i.pravatar.cc/150?u=Alex+Smith`} alt="Alex Smith" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Alex Smith</div>
                <div className="flex text-amber-400">
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 text-zinc-600" />
                </div>
              </div>
            </div>
            <div className="text-xs text-zinc-500">2 days ago</div>
          </div>
          <p className="text-sm text-zinc-400 mb-3 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel egestas eu, et ipsum mi. 
            In quis sodales ex. Suspendisse sed rhoncus lorem. Fusce ut sodales ipsum. 
          </p>
          <div className="flex gap-4">
            <button className="flex items-center gap-1 text-xs text-blue-400"><ThumbsUp className="w-4 h-4" /> 12</button>
            <button className="flex items-center gap-1 text-xs text-red-400"><ThumbsDown className="w-4 h-4" /> 2</button>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden">
                <img src={`https://i.pravatar.cc/150?u=John+Doe`} alt="John Doe" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">John Doe</div>
                <div className="flex text-amber-400">
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 text-zinc-600" />
                  <Star className="w-3 h-3 text-zinc-600" />
                </div>
              </div>
            </div>
            <div className="text-xs text-zinc-500">4 days ago</div>
          </div>
          <p className="text-sm text-zinc-400 mb-3 leading-relaxed">
            Nam quis ligula est. Nunc vestibulum turpis in est consequat. Ut sollicitudin faucibus magna non gravida. 
            Suspendisse ullamcorper justo vel porta imperdiet.
          </p>
          <div className="flex gap-4">
            <button className="flex items-center gap-1 text-xs text-blue-400"><ThumbsUp className="w-4 h-4" /> 5</button>
            <button className="flex items-center gap-1 text-xs text-red-400"><ThumbsDown className="w-4 h-4" /> 1</button>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <button className="text-blue-400 text-xs font-medium hover:underline">View all Customer Reviews</button>
      </div>
    </div>
  );
}
