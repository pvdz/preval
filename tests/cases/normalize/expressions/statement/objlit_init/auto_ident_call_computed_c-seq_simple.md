# Preval test case

# auto_ident_call_computed_c-seq_simple.md

> Normalize > Expressions > Statement > Objlit init > Auto ident call computed c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
({ x: (1, 2, $(b))["$"](1) });
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
({ x: (1, 2, $(b))[`\$`](1) });
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallObj = $(b);
tmpCallObj.$(1);
$(a);
`````

## Output


`````js filename=intro
const b = { $: $ };
const tmpCallObj = $(b);
tmpCallObj.$(1);
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
b.$( 1 );
const c = {
  a: 999,
  b: 1000,
};
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
