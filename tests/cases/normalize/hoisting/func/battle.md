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
  var a;
  function a() {
    $(1);
  }
  function a() {
    $(2);
  }
  $(3);
  function a() {
    $(4);
  }
  $(5);
  a();
  $(6);
}
const tmpCallCallee = $;
const tmpCalleeParam = top();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function top() {
  var a;
  function a() {
    $(1);
  }
  function a() {
    $(2);
  }
  $(3);
  function a() {
    $(4);
  }
  $(5);
  a();
  $(6);
}
const tmpCallCallee = $;
const tmpCalleeParam = top();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 3
 - 2: 5
 - 3: 4
 - 4: 6
 - 5: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
