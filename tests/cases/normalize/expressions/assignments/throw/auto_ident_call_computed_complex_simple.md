# Preval test case

# auto_ident_call_computed_complex_simple.md

> Normalize > Expressions > Assignments > Throw > Auto ident call computed complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
throw (a = $(b)["$"](1));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
throw (a = $(b)[`\$`](1));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallObj = $(b);
a = tmpCallObj.$(1);
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const b = { $: $ };
const tmpCallObj = $(b);
const tmpClusterSSA_a = tmpCallObj.$(1);
throw tmpClusterSSA_a;
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b.$( 1 );
throw c;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
