import React, { useState } from 'react';
import { X, Ruler, Sparkles, Check, HelpCircle, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import {
  WOMEN_PRET_INCHES,
  WOMEN_PRET_CM,
  WOMEN_BOTTOMS_INCHES,
  MEN_PRET_INCHES,
  UNSTITCHED_YARDAGE_INFO,
  HOW_TO_MEASURE_GUIDELINES,
  recommendSize
} from '../data/sizeGuides';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideModalOpen, setIsSizeGuideModalOpen, sizeGuideInitialCategory } = useShop();

  const [activeTab, setActiveTab] = useState<'women' | 'bottoms' | 'men' | 'unstitched' | 'finder'>(
    sizeGuideInitialCategory === 'men' ? 'men' : sizeGuideInitialCategory === 'unstitched' ? 'unstitched' : 'women'
  );

  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  // Interactive Quiz state
  const [quizGender, setQuizGender] = useState<'women' | 'men'>('women');
  const [quizHeightFeet, setQuizHeightFeet] = useState<number>(5);
  const [quizHeightInches, setQuizHeightInches] = useState<number>(5);
  const [quizWeightKg, setQuizWeightKg] = useState<number>(58);
  const [quizFit, setQuizFit] = useState<'slim' | 'regular' | 'relaxed'>('regular');
  const [quizResult, setQuizResult] = useState<ReturnType<typeof recommendSize> | null>(null);

  if (!isSizeGuideModalOpen) return null;

  const handleRunQuiz = () => {
    const result = recommendSize(quizGender, quizHeightFeet, quizHeightInches, quizWeightKg, quizFit);
    setQuizResult(result);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-[#FAF9F5] w-full max-w-4xl rounded-sm shadow-2xl border border-[#DED6C7] overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 bg-white border-b border-[#E8E2D7] flex items-center justify-between shrink-0">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-[#7D705C] flex items-center gap-2">
              <span>Pakistani Ethnic Wear Sizing</span>
              <span aria-hidden="true">·</span>
              <span>Made-to-Measure Standards</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A2521]">
              Atelier Size Guide & Fit Finder
            </h2>
          </div>

          <button
            onClick={() => setIsSizeGuideModalOpen(false)}
            className="p-2 text-[#68736D] hover:text-[#1A2521] hover:bg-[#F4EFE6] rounded transition-colors focus:outline-none"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation & Unit Switcher */}
        <div className="px-6 py-3 bg-[#F4EFE6] border-b border-[#E4DDD0] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
            <button
              onClick={() => setActiveTab('women')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                activeTab === 'women'
                  ? 'bg-[#1A2521] text-white'
                  : 'text-[#48534D] hover:text-[#1A2521]'
              }`}
            >
              Women's Prêt
            </button>
            <button
              onClick={() => setActiveTab('bottoms')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                activeTab === 'bottoms'
                  ? 'bg-[#1A2521] text-white'
                  : 'text-[#48534D] hover:text-[#1A2521]'
              }`}
            >
              Trousers & Shalwars
            </button>
            <button
              onClick={() => setActiveTab('men')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                activeTab === 'men'
                  ? 'bg-[#1A2521] text-white'
                  : 'text-[#48534D] hover:text-[#1A2521]'
              }`}
            >
              Menswear Kurta & Waistcoat
            </button>
            <button
              onClick={() => setActiveTab('unstitched')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                activeTab === 'unstitched'
                  ? 'bg-[#1A2521] text-white'
                  : 'text-[#48534D] hover:text-[#1A2521]'
              }`}
            >
              Unstitched Yardage
            </button>
            <button
              onClick={() => setActiveTab('finder')}
              className={`px-3 py-1.5 text-xs font-bold rounded transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'finder'
                  ? 'bg-[#9B7A38] text-white'
                  : 'text-[#9B7A38] hover:bg-[#EAE0CF]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Fit Quiz</span>
            </button>
          </div>

          {/* Unit Toggle */}
          {activeTab !== 'unstitched' && activeTab !== 'finder' && (
            <div className="flex items-center gap-1 bg-white p-0.5 rounded border border-[#DDD3C2] text-xs">
              <button
                onClick={() => setUnit('inches')}
                className={`px-2.5 py-1 font-semibold rounded ${
                  unit === 'inches' ? 'bg-[#1A2521] text-white' : 'text-[#5C6660]'
                }`}
              >
                Inches
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-2.5 py-1 font-semibold rounded ${
                  unit === 'cm' ? 'bg-[#1A2521] text-white' : 'text-[#5C6660]'
                }`}
              >
                CM
              </button>
            </div>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: Women's Prêt */}
          {activeTab === 'women' && (
            <div className="space-y-6">
              <div className="border border-[#E2D9CB] rounded-sm overflow-hidden bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#1A2521] text-white uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="py-3 px-4">Size</th>
                        <th className="py-3 px-4">Bust / Chest</th>
                        <th className="py-3 px-4">Waist</th>
                        <th className="py-3 px-4">Hip</th>
                        <th className="py-3 px-4">Kameez Length</th>
                        <th className="py-3 px-4">Shoulder</th>
                        <th className="py-3 px-4">Sleeve</th>
                        <th className="py-3 px-4">Trouser</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EFEAE1] tabular-nums text-[#323B36]">
                      {(unit === 'inches' ? WOMEN_PRET_INCHES : WOMEN_PRET_CM).map((row) => (
                        <tr key={row.size} className="hover:bg-[#FAF8F5] transition-colors">
                          <td className="py-3 px-4 font-bold text-[#1A2521]">{row.size}</td>
                          <td className="py-3 px-4">{row.bustOrChest}</td>
                          <td className="py-3 px-4">{row.waist}</td>
                          <td className="py-3 px-4">{row.hip}</td>
                          <td className="py-3 px-4">{row.kameezLength}</td>
                          <td className="py-3 px-4">{row.shoulder}</td>
                          <td className="py-3 px-4">{row.sleeveLength}</td>
                          <td className="py-3 px-4">{row.trouserLength}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Atelier Note */}
              <div className="p-4 bg-white border border-[#E4DCCE] rounded text-xs text-[#525C56] space-y-1">
                <p className="font-semibold text-[#1A2521] flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-[#9B7A38]" />
                  Internal Seam Margin Guarantee
                </p>
                <p>
                  Every Zariya prêt kurta is tailored with a 1.5-inch internal fabric margin on both side seams. If your measurements are between standard sizes, your local tailor can easily let it out or take it in without compromising embroidery tension.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: Bottoms & Shalwars */}
          {activeTab === 'bottoms' && (
            <div className="space-y-6">
              <div className="border border-[#E2D9CB] rounded-sm overflow-hidden bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#1A2521] text-white uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="py-3 px-4">Size</th>
                        <th className="py-3 px-4">Waist (Relaxed)</th>
                        <th className="py-3 px-4">Waist (Stretched)</th>
                        <th className="py-3 px-4">Hip</th>
                        <th className="py-3 px-4">Length</th>
                        <th className="py-3 px-4">Bottom Hem Opening (Paicha)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EFEAE1] tabular-nums text-[#323B36]">
                      {WOMEN_BOTTOMS_INCHES.map((row) => (
                        <tr key={row.size} className="hover:bg-[#FAF8F5]">
                          <td className="py-3 px-4 font-bold text-[#1A2521]">{row.size}</td>
                          <td className="py-3 px-4">{row.waistRelaxed}</td>
                          <td className="py-3 px-4">{row.waistStretched}</td>
                          <td className="py-3 px-4">{row.hip}</td>
                          <td className="py-3 px-4">{row.trouserLength}</td>
                          <td className="py-3 px-4">{row.bottomOpening}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-white border border-[#E2D9CB] rounded">
                  <h4 className="font-semibold text-[#1A2521] mb-1">Cigarette & Straight Pants</h4>
                  <p className="text-[#56605A]">
                    Designed with an elasticated waistband and back gathers for comfortable fit while seated. Tapered hem opening (12"–14") looks pristine with heels or flat khussas.
                  </p>
                </div>
                <div className="p-4 bg-white border border-[#E2D9CB] rounded">
                  <h4 className="font-semibold text-[#1A2521] mb-1">Traditional Gathered Shalwar</h4>
                  <p className="text-[#56605A]">
                    Generously pleated for ethnic comfort with soft cotton waistband drawstrings (nada) and stiffened paicha with multi-row needlework.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Menswear */}
          {activeTab === 'men' && (
            <div className="space-y-6">
              <div className="border border-[#E2D9CB] rounded-sm overflow-hidden bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#1A2521] text-white uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="py-3 px-4">Size</th>
                        <th className="py-3 px-4">Chest</th>
                        <th className="py-3 px-4">Mandarin Collar</th>
                        <th className="py-3 px-4">Shoulder</th>
                        <th className="py-3 px-4">Kurta Length</th>
                        <th className="py-3 px-4">Sleeve</th>
                        <th className="py-3 px-4">Waistcoat Chest</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EFEAE1] tabular-nums text-[#323B36]">
                      {MEN_PRET_INCHES.map((row) => (
                        <tr key={row.size} className="hover:bg-[#FAF8F5]">
                          <td className="py-3 px-4 font-bold text-[#1A2521]">{row.size}</td>
                          <td className="py-3 px-4">{row.chest}</td>
                          <td className="py-3 px-4">{row.neckCollar}</td>
                          <td className="py-3 px-4">{row.shoulder}</td>
                          <td className="py-3 px-4">{row.kurtaLength}</td>
                          <td className="py-3 px-4">{row.sleeveLength}</td>
                          <td className="py-3 px-4">{row.waistcoatChest}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Unstitched Fabric Yardage */}
          {activeTab === 'unstitched' && (
            <div className="space-y-4">
              <p className="text-xs text-[#525C56]">
                All Zariya unstitched 3-piece and 2-piece luxury suits provide extra yardage so you can craft floor-length anarkalis, box-pleated kurtas, or flared palazzos with your master tailor.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {UNSTITCHED_YARDAGE_INFO.map((item, idx) => (
                  <div key={idx} className="p-4 bg-white border border-[#E4DCCE] rounded">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#9B7A38] block mb-1">
                      {item.meters}
                    </span>
                    <h4 className="font-serif text-base font-semibold text-[#1A2521] mb-1">
                      {item.component}
                    </h4>
                    <p className="text-xs text-[#5D6761] leading-relaxed">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Interactive Smart Fit Finder Quiz */}
          {activeTab === 'finder' && (
            <div className="space-y-6">
              <div className="bg-white p-6 border border-[#E2D8C6] rounded">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-[#9B7A38]" />
                  <h3 className="font-serif text-lg font-semibold text-[#1A2521]">
                    Interactive Pakistani Size Finder
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {/* Gender */}
                  <div>
                    <label className="font-semibold text-[#323B36] block mb-1.5">Collection Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setQuizGender('women')}
                        className={`py-2 text-center rounded border font-medium ${
                          quizGender === 'women'
                            ? 'bg-[#1A2521] text-white border-[#1A2521]'
                            : 'bg-[#FAF8F5] text-[#55605A] border-[#DCD3C3]'
                        }`}
                      >
                        Women's Prêt
                      </button>
                      <button
                        onClick={() => setQuizGender('men')}
                        className={`py-2 text-center rounded border font-medium ${
                          quizGender === 'men'
                            ? 'bg-[#1A2521] text-white border-[#1A2521]'
                            : 'bg-[#FAF8F5] text-[#55605A] border-[#DCD3C3]'
                        }`}
                      >
                        Menswear
                      </button>
                    </div>
                  </div>

                  {/* Height */}
                  <div>
                    <label className="font-semibold text-[#323B36] block mb-1.5">
                      Height: {quizHeightFeet} ft {quizHeightInches} in
                    </label>
                    <div className="flex items-center gap-2">
                      <select
                        value={quizHeightFeet}
                        onChange={(e) => setQuizHeightFeet(Number(e.target.value))}
                        className="flex-1 py-1.5 px-3 border border-[#DCD3C3] rounded bg-white"
                      >
                        <option value={4}>4 ft</option>
                        <option value={5}>5 ft</option>
                        <option value={6}>6 ft</option>
                      </select>
                      <select
                        value={quizHeightInches}
                        onChange={(e) => setQuizHeightInches(Number(e.target.value))}
                        className="flex-1 py-1.5 px-3 border border-[#DCD3C3] rounded bg-white"
                      >
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
                          <option key={i} value={i}>{i} inches</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Weight */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="font-semibold text-[#323B36]">Weight (kg)</label>
                      <span className="font-bold text-[#1A2521] tabular-nums">{quizWeightKg} kg</span>
                    </div>
                    <input
                      type="range"
                      min="40"
                      max="115"
                      value={quizWeightKg}
                      onChange={(e) => setQuizWeightKg(Number(e.target.value))}
                      className="w-full accent-[#1A2521]"
                    />
                    <div className="flex justify-between text-[10px] text-[#8C958F] mt-1">
                      <span>40 kg</span>
                      <span>75 kg</span>
                      <span>115 kg</span>
                    </div>
                  </div>

                  {/* Fit Preference */}
                  <div>
                    <label className="font-semibold text-[#323B36] block mb-1.5">Desired Silhouette</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'slim', label: 'Tailored' },
                        { id: 'regular', label: 'Standard' },
                        { id: 'relaxed', label: 'Flowing' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setQuizFit(item.id as any)}
                          className={`py-2 text-center rounded border font-medium text-[11px] ${
                            quizFit === item.id
                              ? 'bg-[#1A2521] text-white border-[#1A2521]'
                              : 'bg-[#FAF8F5] text-[#55605A] border-[#DCD3C3]'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleRunQuiz}
                  className="mt-6 w-full py-2.5 bg-[#9B7A38] hover:bg-[#83662B] text-white font-semibold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Calculate Recommended Size</span>
                </button>
              </div>

              {/* Recommendation Card */}
              {quizResult && (
                <div className="p-5 bg-[#FAF4EA] border border-[#DECFB5] rounded space-y-3 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-[#9B7A38]">
                      Personalized Recommendation
                    </span>
                    <span className="text-xs bg-white text-[#1A2521] font-bold px-3 py-1 rounded border border-[#DECFB5]">
                      98% Fit Accuracy
                    </span>
                  </div>

                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-3xl font-bold text-[#1A2521]">
                      Size {quizResult.recommendedSize}
                    </span>
                    <span className="text-xs text-[#5D6761]">
                      ({quizGender === 'women' ? 'Women\'s Prêt' : 'Menswear Ensemble'})
                    </span>
                  </div>

                  <p className="text-xs text-[#35403A] font-medium leading-relaxed">
                    {quizResult.explanation}
                  </p>

                  <p className="text-xs text-[#6B756F] bg-white/80 p-3 rounded border border-[#E7DECD]">
                    💡 <strong className="text-[#1A2521]">Fit Stylist Advice:</strong> {quizResult.fitTip}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Measuring Guide Section */}
          <div className="pt-6 border-t border-[#E8E2D7]">
            <h4 className="font-serif text-lg font-semibold text-[#1A2521] mb-3 flex items-center gap-2">
              <Ruler className="w-4 h-4 text-[#9B7A38]" />
              <span>How To Take Ethnic Measurements</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {HOW_TO_MEASURE_GUIDELINES.map((item, idx) => (
                <div key={idx} className="p-3 bg-white border border-[#E7DFD1] rounded text-xs space-y-1">
                  <p className="font-semibold text-[#1A2521]">{item.title}</p>
                  <p className="text-[#646E68] text-[11px] leading-relaxed">{item.instruction}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-[#E8E2D7] flex items-center justify-between shrink-0">
          <p className="text-xs text-[#6F7973]">
            Need made-to-measure custom stitching? Add custom measurements during checkout.
          </p>
          <button
            onClick={() => setIsSizeGuideModalOpen(false)}
            className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#1A2521] hover:bg-[#2C3B34] rounded transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
