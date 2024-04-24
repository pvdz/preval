# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Assignments > Arr element > Auto ident computed simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$((a = b[$("c")]) + (a = b[$("c")]));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$((a = b[$(`c`)]) + (a = b[$(`c`)]));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpAssignRhsCompObj = b;
const tmpAssignRhsCompProp = $(`c`);
a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
let tmpBinBothLhs = a;
const tmpAssignRhsCompObj$1 = b;
const tmpAssignRhsCompProp$1 = $(`c`);
a = tmpAssignRhsCompObj$1[tmpAssignRhsCompProp$1];
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const tmpAssignRhsCompProp = $(`c`);
const b = { c: 1 };
let a = b[tmpAssignRhsCompProp];
const tmpBinBothLhs = a;
const tmpAssignRhsCompProp$1 = $(`c`);
a = b[tmpAssignRhsCompProp$1];
const tmpCalleeParam = tmpBinBothLhs + a;
$(tmpCalleeParam);
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "c" );
const b = { c: 1 };
let c = b[ a ];
const d = c;
const e = $( "c" );
c = b[ e ];
const f = d + c;
$( f );
$( c, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - 2: 'c'
 - 3: 2
 - 4: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
