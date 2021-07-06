# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident logic and or
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = ($($(1)) && $($(1))) || $($(2));
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let a = ($($(1)) && $($(1))) || $($(2));
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
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    a = tmpCallCallee$1(tmpCalleeParam$1);
  } else {
  }
  if (a) {
  } else {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    a = tmpCallCallee$3(tmpCalleeParam$3);
  }
  $(a);
  return undefined;
};
const tmpCallCallee$5 = $;
const tmpCalleeParam$5 = f();
tmpCallCallee$5(tmpCalleeParam$5);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(1);
let a = $(tmpCalleeParam);
if (a) {
  const tmpCalleeParam$1 = $(1);
  a = $(tmpCalleeParam$1);
} else {
}
if (a) {
  $(a);
} else {
  const tmpCalleeParam$3 = $(2);
  const tmpClusterSSA_a = $(tmpCalleeParam$3);
  $(tmpClusterSSA_a);
}
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
