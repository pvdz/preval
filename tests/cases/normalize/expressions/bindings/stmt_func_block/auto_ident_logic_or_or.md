# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident logic or or
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = $($(0)) || $($(1)) || $($(2));
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  let a = tmpCallCallee(tmpCalleeParam);
  if (a) {
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    a = tmpCallCallee$1(tmpCalleeParam$1);
  }
  if (a) {
  } else {
    const tmpCallCallee$2 = $;
    const tmpCalleeParam$2 = $(2);
    a = tmpCallCallee$2(tmpCalleeParam$2);
  }
  $(a);
}
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f();
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
function f() {
  const tmpCalleeParam = $(0);
  let a = $(tmpCalleeParam);
  if (a) {
  } else {
    const tmpCalleeParam$1 = $(1);
    a = $(tmpCalleeParam$1);
  }
  if (a) {
  } else {
    const tmpCalleeParam$2 = $(2);
    a = $(tmpCalleeParam$2);
  }
  $(a);
}
const tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
