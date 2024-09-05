# Preval test case

# auto_ident_call_prop_c-seq.md

> Normalize > Expressions > Statement > Binary both > Auto ident call prop c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
(1, 2, $(b)).$(1) + (1, 2, $(b)).$(1);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
(1, 2, $(b)).$(1) + (1, 2, $(b)).$(1);
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallObj = $(b);
const tmpBinBothLhs = tmpCallObj.$(1);
const tmpCallObj$1 = $(b);
const tmpBinBothRhs = tmpCallObj$1.$(1);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output


`````js filename=intro
const b = { $: $ };
const tmpCallObj = $(b);
const tmpBinBothLhs = tmpCallObj.$(1);
const tmpCallObj$1 = $(b);
const tmpBinBothRhs = tmpCallObj$1.$(1);
tmpBinBothLhs + tmpBinBothRhs;
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b.$( 1 );
const d = $( a );
const e = d.$( 1 );
c + e;
const f = {
  a: 999,
  b: 1000,
};
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: { $: '"<$>"' }
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
