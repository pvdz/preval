# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Assignments > Arr element > Auto ident delete prop c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$((a = delete ($(1), $(2), $(arg)).y) + (a = delete ($(1), $(2), $(arg)).y));
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$((a = delete ($(1), $(2), $(arg)).y) + (a = delete ($(1), $(2), $(arg)).y));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
$(1);
$(2);
const tmpDeleteObj = $(arg);
a = delete tmpDeleteObj.y;
let tmpBinBothLhs = a;
$(1);
$(2);
const tmpDeleteObj$1 = $(arg);
a = delete tmpDeleteObj$1.y;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
$(1);
$(2);
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
let tmpSSA_a = delete tmpDeleteObj.y;
const tmpBinBothLhs = tmpSSA_a;
$(1);
$(2);
const tmpDeleteObj$1 = $(arg);
tmpSSA_a = delete tmpDeleteObj$1.y;
const tmpCalleeParam = tmpBinBothLhs + tmpSSA_a;
$(tmpCalleeParam);
$(tmpSSA_a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = { y: 1 };
const b = $( a );
let c = deleteb.y;
const d = c;
$( 1 );
$( 2 );
const e = $( a );
c = deletee.y;
const f = d + c;
$( f );
$( c, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: 1
 - 5: 2
 - 6: {}
 - 7: 2
 - 8: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
