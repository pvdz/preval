# Preval test case

# auto_ident_logic_and_and.md

> normalize > expressions > assignments > stmt_func_top > auto_ident_logic_and_and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  a = $($(1)) && $($(1)) && $($(2));
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  a = tmpCallCallee(tmpCalleeParam);
  if (a) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    a = tmpCallCallee$1(tmpCalleeParam$1);
  }
  if (a) {
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
  const tmpCalleeParam = $(1);
  let SSA_a = $(tmpCalleeParam);
  if (SSA_a) {
    const tmpCalleeParam$1 = $(1);
    SSA_a = $(tmpCalleeParam$1);
  }
  if (SSA_a) {
    const tmpCalleeParam$2 = $(2);
    SSA_a = $(tmpCalleeParam$2);
  }
  $(SSA_a);
}
const tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
