# Preval test case

# auto_ident_unary_plus_simple.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident unary plus simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let arg = 1;

    let a = +arg;
    $(a, arg);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
    let arg = 1;
    let a = +arg;
    $(a, arg);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let arg = 1;
  let a = +arg;
  $(a, arg);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(1, 1);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1, 1 );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
