# Preval test case

# battle.md

> normalize > hoisting > func > battle
>
> Who wins?

#TODO

## Input

`````js filename=intro
function top() {
  function a() { $(1); }
  function a() { $(2); }
  var a;
  $(3);
  function a() { $(4); }
  $(5);
  a();
  $(6);
}
$(top());

`````

## Normalized

`````js filename=intro
function top() {
  function a() {
    $(4);
  }
  ('<eliminated duplicate func decl `a`>');
  ('<eliminated duplicate func decl `a`>');
  ('<hoisted func decl `a`>');
  $(3);
  ('<hoisted func decl `a`>');
  $(5);
  a();
  $(6);
}
var tmpArg;
('<hoisted var `tmpArg` decl without init>');
tmpArg = top();
$(tmpArg);
`````

## Output

`````js filename=intro
function top() {
  function a() {
    $(4);
  }
  $(3);
  $(5);
  a();
  $(6);
}
var tmpArg;
tmpArg = top();
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 3
 - 1: 5
 - 2: 4
 - 3: 6
 - 4: null
 - 5: undefined

Normalized calls: Same

Final output calls: Same
