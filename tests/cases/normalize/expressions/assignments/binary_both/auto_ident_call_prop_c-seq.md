# Preval test case

# auto_ident_call_prop_c-seq.md

> Normalize > Expressions > Assignments > Binary both > Auto ident call prop c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

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
const b = { $: $ };
const tmpCallObj = $(b);
let tmpSSA_a = tmpCallObj.$(1);
const tmpBinBothLhs = tmpSSA_a;
const tmpCallObj$1 = $(b);
tmpSSA_a = tmpCallObj$1.$(1);
const tmpCalleeParam = tmpBinBothLhs + tmpSSA_a;
$(tmpCalleeParam);
$(tmpSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
let c = b.$( 1 );
const d = c;
const e = $( a );
c = e.$( 1 );
const f = d + c;
$( f );
$( c );
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
