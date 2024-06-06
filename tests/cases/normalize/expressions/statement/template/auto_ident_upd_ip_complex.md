# Preval test case

# auto_ident_upd_ip_complex.md

> Normalize > Expressions > Statement > Template > Auto ident upd ip complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(`before  ${$($(b)).x++}  after`);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$(`before  ` + $coerce($($(b)).x++, `string`) + `  after`);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = `before  `;
const tmpCallCallee$3 = $;
const tmpCalleeParam$1 = $(b);
const tmpPostUpdArgObj = tmpCallCallee$3(tmpCalleeParam$1);
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
const tmpAssignMemLhsObj = tmpPostUpdArgObj;
const tmpAssignMemRhs = tmpPostUpdArgVal + 1;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
const tmpCallCallee$1 = tmpPostUpdArgVal;
const tmpBinBothRhs = $coerce(tmpCallCallee$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}  after`;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = $(b);
const tmpPostUpdArgObj = $(tmpCalleeParam$1);
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
const tmpAssignMemRhs = tmpPostUpdArgVal + 1;
tmpPostUpdArgObj.x = tmpAssignMemRhs;
const tmpBinBothRhs = $coerce(tmpPostUpdArgVal, `string`);
const tmpCalleeParam = `before  ${tmpBinBothRhs}  after`;
$(tmpCalleeParam);
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = {
a: 999,
b: 1000
;
const c = $( a );
const d = $( c );
const e = d.x;
const f = e + 1;
d.x = f;
const g = $coerce( e, "string" );
const h = `before  ${[object Object]}  after`;
$( h );
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 'before 1 after'
 - 4: { a: '999', b: '1000' }, { x: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
