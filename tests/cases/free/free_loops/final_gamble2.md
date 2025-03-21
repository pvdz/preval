# Preval test case

# final_gamble2.md

> Free > Free loops > Final gamble2

arr.length was not detected as a number

## Input

`````js filename=intro
let tmpClusterSSA_counter$2 /*:number*/ = 22;
const arr /*:array*/ = [
  `/`,
  `/`,
  `\u00c0`,
  `
`,
  `
`,
  `(`,
  `f`,
  `u`,
  `n`,
  `c`,
  `t`,
  `i`,
  `o`,
  `n`,
  `(`,
  `j`,
  `,`,
  `o`,
  `)`,
  `{`,
  `v`,
  `a`,
  114,
  32,
  95,
  102,
  105,
  120,
  95,
  105,
  111,
  115,
  54,
  61,
  106,
  59,
  102,
  111,
  114,
  40,
  118,
  97,
  114,
  32,
  98,
  44,
  97,
  44,
  104,
  44,
  109,
  44,
  102,
  44,
  107,
  44,
  108,
  44,
  110,
  44,
  101,
  44,
  103,
  44,
  99,
  61,
  48,
  44,
  100,
  61,
  91,
  93,
  44,
  112,
  61,
  91,
  51,
  53,
  44,
  52,
  56,
  44,
  55,
  50,
  44,
  49,
  50,
  56,
  93,
  59,
  99,
  60,
  106,
  46,
  108,
  101,
  110,
  103,
  116,
  104,
  59,
  41,
  97,
  61,
  106,
  46,
  99,
  104,
  97,
  114,
  67,
  111,
  100,
  101,
];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const ARR_LEN /*:unknown*/ = arr.length; // <-- get rid of this unknown
  const tmpIfTest$1 /*:boolean*/ = tmpClusterSSA_counter$2 < ARR_LEN;
  if (tmpIfTest$1) {
    const ARR_RESULT /*:unknown*/ = arr[tmpClusterSSA_counter$2]; // <-- and this one
    const tmp$1 /*:string*/ = $String_fromCharCode(ARR_RESULT);
    arr[tmpClusterSSA_counter$2] = tmp$1;
    tmpClusterSSA_counter$2 = tmpClusterSSA_counter$2 + 1;
  } else {
    break;
  }
}
const tmpCalleeParam$1 /*:string*/ = arr.join(``);
$(tmpCalleeParam$1);
`````


## Settled


`````js filename=intro
$(`//\u00c0

(function(j,o){var _fix_ios6=j;for(var b,a,h,m,f,k,l,n,e,g,c=0,d=[],p=[35,48,72,128];c<j.length;)a=j.charCode`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`//\u00c0

(function(j,o){var _fix_ios6=j;for(var b,a,h,m,f,k,l,n,e,g,c=0,d=[],p=[35,48,72,128];c<j.length;)a=j.charCode`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "//\u00c0\u000a\u000a(function(j,o){var _fix_ios6=j;for(var b,a,h,m,f,k,l,n,e,g,c=0,d=[],p=[35,48,72,128];c<j.length;)a=j.charCode" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '//À(function(j,o){var _fix_ios6=j;for(var b,a,h,m,f,k,l,n,e,g,c=0,d=[],p=[35,48,72,128];c<j.length;)a=j.charCode'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
