import { Badge } from "@/components/ui/badge";

export const Feature1 = () => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row gap-10 lg:items-center">
        <div className="flex gap-4 flex-col flex-1">
          <div>
            <Badge>Hvorfor betale mer, for mindre?</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-xl md:text-3xl lg:text-5xl tracking-tighter lg:max-w-xl font-regular text-left">
              En ny era for personlig formuesforvaltning
            </h2>
            <p className="text-lg max-w-xl lg:max-w-sm leading-relaxed tracking-tight text-muted-foreground text-left">
              Ved hjelp av KI og vår plattform kan du samle alle tall og data på ett sted, og få en oversikt over din formue.
            </p>
          </div>
        </div>
        <div className="bg-muted rounded-md w-fit aspect-video h-fit flex-1 relative flex items-center justify-center p-8">
          <div className="w-1/3 h-1/3">
            <svg className="w-full h-full" version="1.0" xmlns="http://www.w3.org/2000/svg"
             width="518.000000pt" height="482.000000pt" viewBox="0 0 518.000000 482.000000"
             preserveAspectRatio="xMidYMid meet">
            
            <g transform="translate(0.000000,482.000000) scale(0.100000,-0.100000)"
            fill="#000000" stroke="none">
            <path d="M2485 4534 c-124 -10 -315 -49 -462 -94 -296 -90 -623 -296 -854
            -536 -253 -264 -434 -601 -513 -956 -37 -164 -40 -153 51 -166 86 -12 93 -9
            93 43 1 87 94 368 174 522 100 193 258 401 398 524 40 35 75 66 78 69 12 13
            90 71 155 115 138 94 336 187 505 239 282 86 639 99 935 35 49 -10 94 -19 101
            -19 11 0 41 84 46 129 3 22 -3 26 -67 42 -160 41 -471 67 -640 53z"/>
            <path d="M3360 4028 c-35 -51 -130 -185 -210 -298 -136 -190 -352 -498 -515
            -734 -65 -94 -69 -103 -68 -152 2 -97 47 -254 72 -254 9 0 167 217 361 496 8
            12 51 72 95 134 44 61 87 122 95 133 331 476 320 458 320 504 0 94 -47 263
            -73 263 -7 0 -42 -42 -77 -92z"/>
            <path d="M3866 4028 l-50 -60 55 -46 c130 -111 286 -294 378 -444 228 -376
            318 -802 260 -1238 -49 -373 -227 -747 -486 -1022 -29 -31 -53 -60 -53 -65 0
            -5 25 -33 56 -63 l55 -55 50 55 c223 246 358 472 458 765 137 406 137 869 -1
            1280 -93 281 -257 557 -453 764 -62 65 -203 191 -214 190 -3 0 -28 -27 -55
            -61z"/>
            <path d="M2057 3873 c-9 -14 27 -2547 38 -2661 7 -68 24 -101 97 -183 105
            -119 287 -258 337 -259 12 0 13 99 7 688 -7 703 -21 1525 -31 1847 -7 224 -11
            232 -150 370 -136 135 -279 230 -298 198z"/>
            <path d="M3395 3123 c-49 -69 -117 -165 -151 -212 -33 -47 -99 -140 -145 -206
            -47 -66 -116 -165 -154 -220 -38 -55 -72 -102 -75 -105 -3 -3 -60 -84 -126
            -180 l-119 -175 1 -70 c1 -76 26 -186 50 -224 16 -23 16 -23 34 -5 10 11 85
            114 166 229 81 116 184 262 229 325 44 63 103 147 130 185 26 39 111 159 188
            268 l139 198 -1 60 c-1 92 -46 259 -70 259 -3 0 -46 -57 -96 -127z"/>
            <path d="M750 2008 c-41 -11 -76 -21 -78 -23 -5 -4 34 -127 68 -215 124 -323
            325 -609 575 -819 199 -168 385 -277 635 -374 327 -127 797 -154 1173 -66 92
            22 256 75 269 87 8 9 -47 147 -58 147 -5 -1 -52 -15 -105 -32 -167 -55 -397
            -93 -570 -93 -586 0 -1134 266 -1492 726 -134 171 -226 342 -297 554 -23 69
            -43 125 -44 126 0 1 -35 -8 -76 -18z"/>
            </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
);
