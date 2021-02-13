# Preval test case

# auto_ident_logic_and_simple_complex.md

> normalize > expressions > assignments > stmt_func_block > auto_ident_logic_and_simple_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    a = 1 && $($(1));
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    a = 1;
    if (a) {
      const tmpCallCallee = $;
      const tmpCalleeParam = $(1);
      a = tmpCallCallee(tmpCalleeParam);
    }
    $(a);
  }
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    a = 1;
    if (a) {
      const tmpCalleeParam = $(1);
      a = $(tmpCalleeParam);
    }
    $(a);
  }
}
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same