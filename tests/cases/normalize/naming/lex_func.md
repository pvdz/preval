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
    if ($()) {
      return a_1;
    }
  }
  let a = $(1);
  $(a);
  return a;
}
$(f());
`````

## Output

`````js filename=intro
function f() {
  {
    let a_1 = $(1);
    $(a_1);
    if ($()) {
      return a_1;
    }
  }
  let a = $(1);
  $(a);
  return a;
}
$(f());
`````
