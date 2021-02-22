# Preval test case

# func_block_if.md

> Normalize > Hoisting > Func > Func block if
>
> Block hoisting func decls

#TODO

## Input

`````js filename=intro
function g() {
  if ($(1)) {
    f(); // Should be ok
    function f(){ $(1); }
  }
}
g();
`````

## Normalized

`````js filename=intro
function g() {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    f();
    function f() {
      $(1);
    }
  }
}
g();
`````

## Output

`````js filename=intro
function g() {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    f();
    function f() {
      $(1);
    }
  }
}
g();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
