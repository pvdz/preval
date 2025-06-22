# Preval test case

# ai_intl_segmenter_opaque_options.md

> Ai > Ai2 > Ai intl segmenter opaque options
>
> Test: Intl.Segmenter with opaque locale and options.

## Input

`````js filename=intro
// Expected: Constructor and segment method preserved.
let locale = $('seg_locale', 'ja-JP');
let options = $('seg_options', { granularity: 'word' });
let segmenter = new Intl.Segmenter(locale, options);
let text = $('seg_text', 'これはテストです');
let segments = Array.from(segmenter.segment(text)).map(s=>s.segment);
$('seg_segments_array', segments);
$('seg_resolved_options_gran', segmenter.resolvedOptions().granularity);
`````


## Settled


`````js filename=intro
const locale /*:unknown*/ = $(`seg_locale`, `ja-JP`);
const tmpCalleeParam /*:object*/ /*truthy*/ = { granularity: `word` };
const options /*:unknown*/ = $(`seg_options`, tmpCalleeParam);
const tmpNewCallee /*:unknown*/ = Intl.Segmenter;
const segmenter /*:object*/ /*truthy*/ = new tmpNewCallee(locale, options);
const text /*:unknown*/ = $(`seg_text`, `\u3053\u308c\u306f\u30c6\u30b9\u30c8\u3067\u3059`);
const tmpMCF$1 /*:unknown*/ = segmenter.segment;
const tmpMCP /*:unknown*/ = $dotCall(tmpMCF$1, segmenter, `segment`, text);
const tmpMCOO /*:array*/ /*truthy*/ = $Array_from(tmpMCP);
const tmpLambdaMapLen /*:number*/ = tmpMCOO.length;
const tmpLambdaMapTest /*:boolean*/ = 0 < tmpLambdaMapLen;
const tmpLambdaMapOut /*:array*/ /*truthy*/ = [];
if (tmpLambdaMapTest) {
  const tmpLambdaMapHas /*:boolean*/ = 0 in tmpMCOO;
  if (tmpLambdaMapHas) {
    const tmpLambdaMapVal /*:unknown*/ = tmpMCOO[0];
    const tmpLambdaMapNow /*:unknown*/ = tmpLambdaMapVal.segment;
    tmpLambdaMapOut[0] = tmpLambdaMapNow;
  } else {
  }
  let tmpClusterSSA_tmpLambdaMapCounter /*:number*/ = 1;
  while ($LOOP_UNROLL_10) {
    const tmpLambdaMapTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaMapCounter < tmpLambdaMapLen;
    if (tmpLambdaMapTest$1) {
      const tmpLambdaMapHas$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaMapCounter in tmpMCOO;
      if (tmpLambdaMapHas$1) {
        const tmpLambdaMapVal$1 /*:unknown*/ = tmpMCOO[tmpClusterSSA_tmpLambdaMapCounter];
        const tmpLambdaMapNow$1 /*:unknown*/ = tmpLambdaMapVal$1.segment;
        tmpLambdaMapOut[tmpClusterSSA_tmpLambdaMapCounter] = tmpLambdaMapNow$1;
      } else {
      }
      tmpClusterSSA_tmpLambdaMapCounter = tmpClusterSSA_tmpLambdaMapCounter + 1;
    } else {
      break;
    }
  }
} else {
}
tmpLambdaMapOut.length = tmpLambdaMapLen;
$(`seg_segments_array`, tmpLambdaMapOut);
const tmpMCF$5 /*:unknown*/ = segmenter.resolvedOptions;
const tmpCompObj /*:unknown*/ = $dotCall(tmpMCF$5, segmenter, `resolvedOptions`);
const tmpCalleeParam$1 /*:unknown*/ = tmpCompObj.granularity;
$(`seg_resolved_options_gran`, tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const locale = $(`seg_locale`, `ja-JP`);
const options = $(`seg_options`, { granularity: `word` });
const tmpNewCallee = Intl.Segmenter;
const segmenter = new tmpNewCallee(locale, options);
const text = $(`seg_text`, `\u3053\u308c\u306f\u30c6\u30b9\u30c8\u3067\u3059`);
const tmpMCOO = $Array_from(segmenter.segment(text));
const tmpLambdaMapLen = tmpMCOO.length;
const tmpLambdaMapTest = 0 < tmpLambdaMapLen;
const tmpLambdaMapOut = [];
if (tmpLambdaMapTest) {
  if (0 in tmpMCOO) {
    const tmpLambdaMapNow = tmpMCOO[0].segment;
    tmpLambdaMapOut[0] = tmpLambdaMapNow;
  }
  let tmpClusterSSA_tmpLambdaMapCounter = 1;
  while (true) {
    if (tmpClusterSSA_tmpLambdaMapCounter < tmpLambdaMapLen) {
      if (tmpClusterSSA_tmpLambdaMapCounter in tmpMCOO) {
        const tmpLambdaMapNow$1 = tmpMCOO[tmpClusterSSA_tmpLambdaMapCounter].segment;
        tmpLambdaMapOut[tmpClusterSSA_tmpLambdaMapCounter] = tmpLambdaMapNow$1;
      }
      tmpClusterSSA_tmpLambdaMapCounter = tmpClusterSSA_tmpLambdaMapCounter + 1;
    } else {
      break;
    }
  }
}
tmpLambdaMapOut.length = tmpLambdaMapLen;
$(`seg_segments_array`, tmpLambdaMapOut);
$(`seg_resolved_options_gran`, segmenter.resolvedOptions().granularity);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "seg_locale", "ja-JP" );
const b = { granularity: "word" };
const c = $( "seg_options", b );
const d = Intl.Segmenter;
const e = new d( a, c );
const f = $( "seg_text", "\u3053\u308c\u306f\u30c6\u30b9\u30c8\u3067\u3059" );
const g = e.segment;
const h = $dotCall( g, e, "segment", f );
const i = $Array_from( h );
const j = i.length;
const k = 0 < j;
const l = [];
if (k) {
  const m = 0 in i;
  if (m) {
    const n = i[ 0 ];
    const o = n.segment;
    l[0] = o;
  }
  let p = 1;
  while ($LOOP_UNROLL_10) {
    const q = p < j;
    if (q) {
      const r = p in i;
      if (r) {
        const s = i[ p ];
        const t = s.segment;
        l[p] = t;
      }
      p = p + 1;
    }
    else {
      break;
    }
  }
}
l.length = j;
$( "seg_segments_array", l );
const u = e.resolvedOptions;
const v = $dotCall( u, e, "resolvedOptions" );
const w = v.granularity;
$( "seg_resolved_options_gran", w );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let locale = $(`seg_locale`, `ja-JP`);
let tmpCalleeParam = { granularity: `word` };
let options = $(`seg_options`, tmpCalleeParam);
const tmpNewCallee = Intl.Segmenter;
let segmenter = new tmpNewCallee(locale, options);
let text = $(`seg_text`, `\u3053\u308c\u306f\u30c6\u30b9\u30c8\u3067\u3059`);
const tmpMCF = $Array_from;
const tmpMCF$1 = segmenter.segment;
const tmpMCP = $dotCall(tmpMCF$1, segmenter, `segment`, text);
const tmpMCOO = $dotCall(tmpMCF, $array_constructor, `from`, tmpMCP);
const tmpMCF$3 = tmpMCOO.map;
const tmpMCP$1 = function ($$0) {
  let s = $$0;
  debugger;
  const tmpReturnArg = s.segment;
  return tmpReturnArg;
};
let segments = $dotCall(tmpMCF$3, tmpMCOO, `map`, tmpMCP$1);
$(`seg_segments_array`, segments);
const tmpMCF$5 = segmenter.resolvedOptions;
const tmpCompObj = $dotCall(tmpMCF$5, segmenter, `resolvedOptions`);
let tmpCalleeParam$1 = tmpCompObj.granularity;
$(`seg_resolved_options_gran`, tmpCalleeParam$1);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_map
- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $Array_from
- (todo) type trackeed tricks can possibly support static $array_map


## Globals


BAD@! Found 1 implicit global bindings:

Intl


## Runtime Outcome


Should call `$` with:
 - 1: 'seg_locale', 'ja-JP'
 - 2: 'seg_options', { granularity: '"word"' }
 - eval returned: ('<crash[ Incorrect locale information provided ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
