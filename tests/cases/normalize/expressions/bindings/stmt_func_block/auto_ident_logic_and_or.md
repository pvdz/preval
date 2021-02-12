# Preval test case

# auto_ident_logic_and_or.md

> normalize > expressions > bindings > stmt_func_block > auto_ident_logic_and_or
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = ($($(1)) && $($(1))) || $($(2));
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
    let a = tmpCallCallee(tmpCalleeParam);
    if (a) {
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
}
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f();
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
function f() {
  {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
    let a = tmpCallCallee(tmpCalleeParam);
    if (a) {
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
}
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f();
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
