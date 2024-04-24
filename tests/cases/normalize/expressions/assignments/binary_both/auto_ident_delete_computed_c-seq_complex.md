# Preval test case

# auto_ident_delete_computed_c-seq_complex.md

> Normalize > Expressions > Assignments > Binary both > Auto ident delete computed c-seq complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$(
  (a = delete ($(1), $(2), $(arg))[$("y")]) +
    (a = delete ($(1), $(2), $(arg))[$("y")])
);
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$((a = delete ($(1), $(2), $(arg))[$(`y`)]) + (a = delete ($(1), $(2), $(arg))[$(`y`)]));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
$(1);
$(2);
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
a = delete tmpDeleteCompObj[tmpDeleteCompProp];
let tmpBinBothLhs = a;
$(1);
$(2);
const tmpDeleteCompObj$1 = $(arg);
const tmpDeleteCompProp$1 = $(`y`);
a = delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
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
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
let tmpSSA_a = delete tmpDeleteCompObj[tmpDeleteCompProp];
const tmpBinBothLhs = tmpSSA_a;
$(1);
$(2);
const tmpDeleteCompObj$1 = $(arg);
const tmpDeleteCompProp$1 = $(`y`);
tmpSSA_a = delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
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
const c = $( "y" );
let d = deleteb[ c ];
const e = d;
$( 1 );
$( 2 );
const f = $( a );
const g = $( "y" );
d = deletef[ g ];
const h = e + d;
$( h );
$( d, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: 'y'
 - 5: 1
 - 6: 2
 - 7: {}
 - 8: 'y'
 - 9: 2
 - 10: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
