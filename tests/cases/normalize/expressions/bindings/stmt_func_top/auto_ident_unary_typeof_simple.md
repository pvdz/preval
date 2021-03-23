# Preval test case

# auto_ident_unary_typeof_simple.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident unary typeof simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let arg = 1;

  let a = typeof arg;
  $(a, arg);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let arg = 1;
  let a = typeof arg;
  $(a, arg);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let arg = 1;
  let a = typeof arg;
  $(a, arg);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$('number', 1);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'number', 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
