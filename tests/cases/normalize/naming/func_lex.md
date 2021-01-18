# Preval test case

# global_lex.md

> normalize > naming > global_lex
>
> First an outer binding shadowed by block binding in a function

## Input

`````js filename=intro
function f() {
  let a = $(1);
  $(a);
  {
    let a = $(1);
    $(a);
    if ($()) return a; 
  }
  return a;
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let a = $(1);
  $(a);
  {
    let a_1 = $(1);
    $(a_1);
    {
      let ifTestTmp = $();
      if (ifTestTmp) {
        return a_1;
      }
    }
  }
  return a;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
function f() {
  let a = $(1);
  $(a);
  let a_1 = $(1);
  $(a_1);
  let ifTestTmp = $();
  if (ifTestTmp) {
    return a_1;
  }
  return a;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Result

Should call `$` with:
[[1], [null], [1], [null], [], [null], null];

Normalized calls: Same

Final output calls: Same
