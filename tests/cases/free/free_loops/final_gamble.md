# Preval test case

# final_gamble.md

> Free > Free loops > Final gamble

This loop can be unrolled, given enough unroll counts. But it's actually an 8k array
and that's a bit excessive. Instead, it's also a free loop so that's a lot faster to
resolve.
The array is a tiny fraction of it and at the time of writing it wouldn't do that yet.
The first ten chars of the array are resolved because that's the default for running
arbitrary files :)

## Input

`````js filename=intro
let counter = 11;
const arr = [`/`, `/`, `À`, `
`, `
`, `(`, `f`, `u`, `n`, `c`, `t`, 105, 111, 110, 40, 106, 44, 111, 41, 123, 118, 
  97, 114, 32, 95, 102, 105, 120, 95, 105, 111, 115, 54, 61, 106, 59, 102, 111, 
  114, 40, 118, 97, 114, 32, 98, 44, 97, 44, 104, 44, 109, 44, 102, 44, 107, 44, 
  108, 44, 110, 44, 101, 44, 103, 44, 99, 61, 48, 44, 100, 61, 91, 93, 44, 112, 
  61, 91, 51, 53, 44, 52, 56, 44, 55, 50, 44, 49, 50, 56, 93, 59, 99, 60, 106, 
  46, 108, 101, 110, 103, 116, 104, 59, 41, 97, 61, 106, 46, 99, 104, 97, 114, 
  67, 111, 100, 101];
while (true) {
  if (counter < arr.length) {
    const tmp = String.fromCharCode(arr[counter]);
    arr[counter] = tmp;
    counter = counter + 1;
  } else {
    break;
  }
}
$(arr.join(``));
`````

## Pre Normal


`````js filename=intro
let counter = 11;
const arr = [
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
  105,
  111,
  110,
  40,
  106,
  44,
  111,
  41,
  123,
  118,
  97,
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
while (true) {
  if (counter < arr.length) {
    const tmp = String.fromCharCode(arr[counter]);
    arr[counter] = tmp;
    counter = counter + 1;
  } else {
    break;
  }
}
$(arr.join(``));
`````

## Normalized


`````js filename=intro
let counter = 11;
const arr = [
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
  105,
  111,
  110,
  40,
  106,
  44,
  111,
  41,
  123,
  118,
  97,
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
while (true) {
  const tmpBinBothLhs = counter;
  const tmpBinBothRhs = arr.length;
  const tmpIfTest = tmpBinBothLhs < tmpBinBothRhs;
  if (tmpIfTest) {
    const tmpCalleeParam = arr[counter];
    const tmp = $String_fromCharCode(tmpCalleeParam);
    arr[counter] = tmp;
    counter = counter + 1;
  } else {
    break;
  }
}
const tmpCallCallee = $;
const tmpCalleeParam$1 = arr.join(``);
tmpCallCallee(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
$(`//\u00c0

(function(j,o){var _fix_ios6=j;for(var b,a,h,m,f,k,l,n,e,g,c=0,d=[],p=[35,48,72,128];c<j.length;)a=j.charCode`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "//\u00c0\u000a\u000a(function(j,o){var _fix_ios6=j;for(var b,a,h,m,f,k,l,n,e,g,c=0,d=[],p=[35,48,72,128];c<j.length;)a=j.charCode" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '//À(function(j,o){var _fix_ios6=j;for(var b,a,h,m,f,k,l,n,e,g,c=0,d=[],p=[35,48,72,128];c<j.length;)a=j.charCode'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
