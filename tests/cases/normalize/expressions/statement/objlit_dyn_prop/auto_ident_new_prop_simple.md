# Preval test case

# auto_ident_new_prop_simple.md

> Normalize > Expressions > Statement > Objlit dyn prop > Auto ident new prop simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
({ [new b.$(1)]: 10 });
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
({ [new b.$(1)]: 10 });
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpNewCallee = b.$;
new tmpNewCallee(1);
$(a);
`````

## Output


`````js filename=intro
new $(1);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
new $( 1 );
const a = {
  a: 999,
  b: 1000,
};
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
