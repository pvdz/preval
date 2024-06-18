# Preval test case

# auto_ident_new_computed_simple_simple.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident new computed simple simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = new b["$"](1);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = new b[`\$`](1);
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
const tmpNewCallee = b.$;
let a = new tmpNewCallee(1);
$(a);
`````

## Output


`````js filename=intro
const a = new $(1);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = new $( 1 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
