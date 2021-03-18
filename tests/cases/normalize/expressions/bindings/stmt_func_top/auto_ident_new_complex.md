# Preval test case

# auto_ident_new_complex.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident new complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = new ($($))(1);
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let a = new ($($))(1);
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpNewCallee = $($);
  let a = new tmpNewCallee(1);
  $(a);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpNewCallee = $($);
const a = new tmpNewCallee(1);
$(a);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: {}
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
