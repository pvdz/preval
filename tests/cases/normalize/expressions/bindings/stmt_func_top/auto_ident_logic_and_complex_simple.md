# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident logic and complex simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = $($(1)) && 2;
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let a = $($(1)) && 2;
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  let a = tmpCallCallee(tmpCalleeParam);
  if (a) {
    a = 2;
  } else {
  }
  $(a);
  return undefined;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(1);
const a = $(tmpCalleeParam);
if (a) {
  $(2);
} else {
  $(a);
}
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
