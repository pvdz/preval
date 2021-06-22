# Preval test case

# array_in_array_ident_template.md

> Array > Spread > Array in array ident template
>
> Spreading an array into another array that is assigned to a binding

#TODO

## Input

`````js filename=intro
let a = $(10);
const x = [1, `${$('x')} ${$('y')}`, 3];
if ($) a = $(20);
const y = ['a', ...x, 'b'];
$(y);
`````

## Pre Normal

`````js filename=intro
let a = $(10);
const x = [1, `` + String($(`x`)) + ` ` + String($(`y`)) + ``, 3];
if ($) a = $(20);
const y = [`a`, ...x, `b`];
$(y);
`````

## Normalized

`````js filename=intro
let a = $(10);
const tmpArrElement = 1;
const tmpBinBothLhs$1 = ``;
const tmpCallCallee = String;
const tmpCalleeParam = $(`x`);
const tmpBinBothRhs$1 = tmpCallCallee(tmpCalleeParam);
const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpBinBothLhs = tmpBinLhs$1 + ` `;
const tmpCallCallee$1 = String;
const tmpCalleeParam$1 = $(`y`);
const tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpArrElement$1 = tmpBinLhs + ``;
const x = [tmpArrElement, tmpArrElement$1, 3];
if ($) {
  a = $(20);
} else {
}
const y = [`a`, ...x, `b`];
$(y);
`````

## Output

`````js filename=intro
$(10);
const tmpCalleeParam = $(`x`);
const tmpBinBothRhs$1 = String(tmpCalleeParam);
const tmpCalleeParam$1 = $(`y`);
const tmpBinBothRhs = String(tmpCalleeParam$1);
const tmpBinLhs = `${tmpBinBothRhs$1} ${tmpBinBothRhs}`;
if ($) {
  $(20);
} else {
}
const y = [`a`, 1, tmpBinLhs, 3, `b`];
$(y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 'x'
 - 3: 'y'
 - 4: 20
 - 5: ['a', 1, 'x y', 3, 'b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
