# Preval test case

# auto_ident_new_prop_c-seq.md

> Normalize > Expressions > Assignments > Arr element > Auto ident new prop c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = new (1, 2, $(b)).$(1)) + (a = new (1, 2, $(b)).$(1)));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$((a = new (1, 2, $(b)).$(1)) + (a = new (1, 2, $(b)).$(1)));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCompObj = $(b);
const tmpNewCallee = tmpCompObj.$;
a = new tmpNewCallee(1);
let tmpBinBothLhs = a;
const tmpCompObj$1 = $(b);
const tmpNewCallee$1 = tmpCompObj$1.$;
a = new tmpNewCallee$1(1);
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const tmpCompObj = $(b);
const tmpNewCallee = tmpCompObj.$;
let tmpSSA_a = new tmpNewCallee(1);
const tmpBinBothLhs = tmpSSA_a;
const tmpCompObj$1 = $(b);
const tmpNewCallee$1 = tmpCompObj$1.$;
tmpSSA_a = new tmpNewCallee$1(1);
const tmpCalleeParam = tmpBinBothLhs + tmpSSA_a;
$(tmpCalleeParam);
$(tmpSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b.$;
let d = new c( 1 );
const e = d;
const f = $( a );
const g = f.$;
d = new g( 1 );
const h = e + d;
$( h );
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
 - 5: '[object Object][object Object]'
 - 6: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
