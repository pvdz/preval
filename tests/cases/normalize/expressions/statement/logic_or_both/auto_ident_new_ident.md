# Preval test case

# auto_ident_new_ident.md

> Normalize > Expressions > Statement > Logic or both > Auto ident new ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
new $(1) || new $(1);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
new $(1) || new $(1);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = new $(1);
if (tmpIfTest) {
} else {
  new $(1);
}
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
