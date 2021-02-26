# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident logic or complex simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = $($(0)) || 2;
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  let a = tmpCallCallee(tmpCalleeParam);
  if (a) {
  } else {
    a = 2;
  }
  $(a);
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpCalleeParam = $(0);
  let a = $(tmpCalleeParam);
  if (a) {
  } else {
    a = 2;
  }
  $(a);
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
