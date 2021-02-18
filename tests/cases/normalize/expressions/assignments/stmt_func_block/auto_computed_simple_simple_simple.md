# Preval test case

# auto_computed_simple_simple_simple.md

> normalize > expressions > assignments > stmt_func_block > auto_computed_simple_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    a = { b: $(1) };
    a["b"] = 2;
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
  a.b = 2;
  $(a);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const tmpObjLitVal = $(1);
  const SSA_a = { b: tmpObjLitVal };
  SSA_a.b = 2;
  $(SSA_a);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { b: '2' }
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
