# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Statement > Return > Auto ident literal
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return "foo";
}
$(f());
$(a);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return `foo`;
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  return `foo`;
};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
$(`foo`);
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
$( "foo" );
const a = {
a: 999,
b: 1000
;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
