# Preval test case

# auto_ident_call_prop_c-seq.md

> Normalize > Expressions > Assignments > Binary both > Auto ident call prop c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b)).$(1)) + (a = (1, 2, $(b)).$(1)));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b)).$(1)) + (a = (1, 2, $(b)).$(1)));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallObj = $(b);
a = tmpCallObj.$(1);
let tmpBinBothLhs = a;
const tmpCallObj$1 = $(b);
a = tmpCallObj$1.$(1);
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpCallObj = $(b);
tmpCallObj.$(1);
const tmpCallObj$1 = $(b);
const tmpClusterSSA_a$1 = tmpCallObj$1.$(1);
const tmpCalleeParam /*:primitive*/ = tmpClusterSSA_a$1 + tmpClusterSSA_a$1;
$(tmpCalleeParam);
$(tmpClusterSSA_a$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
b.$( 1 );
const c = $( a );
const d = c.$( 1 );
const e = d + d;
$( e );
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: { $: '"<$>"' }
 - 4: 1
 - 5: 2
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
