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
('<hoisted func decl `f`>');
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
 - 0: 1
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 
 - 5: 1
 - 6: undefined

Normalized calls: Same

Final output calls: Same
