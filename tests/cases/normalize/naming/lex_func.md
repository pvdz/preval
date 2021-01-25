# Preval test case

# global_lex.md

> normalize > naming > global_lex
>
> First a block binding shadowing a later outer binding in a function

## Input

`````js filename=intro
function f() {
  {
    let a = $(1);
    $(a);
    if ($()) return a; 
  }
  let a = $(1);
  $(a);
  return a;
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let a_1 = $(1);
    $(a_1);
    const tmpIfTest = $();
    if (tmpIfTest) {
      return a_1;
    }
  }
  let a = $(1);
  $(a);
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
  let a_1 = $(1);
  $(a_1);
  const tmpIfTest = $();
  if (tmpIfTest) {
    return a_1;
  }
  let a = $(1);
  $(a);
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
 - 2: 
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: undefined

Normalized calls: Same

Final output calls: Same
