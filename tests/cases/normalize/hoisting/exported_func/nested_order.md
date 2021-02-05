# Preval test case

# nested_order.md

> normalize > hoisting > func > nested_order
>
> How do we normalize multiple func decls on the same level?

#TODO

## Input

`````js filename=intro
$(f());
export function f() {
  $(f(), g(), h());
    
  function f() { return $(); }
  function g() { return $(); }
  function h() { return $(); }
}
`````

## Normalized

`````js filename=intro
export function f() {
  $(f(), g(), h());
  function f() {
    return $();
  }
  function g() {
    return $();
  }
  function h() {
    return $();
  }
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
('<hoisted func decl `f`>');
`````

## Output

`````js filename=intro
export function f() {
  $(f(), g(), h());
  function f() {
    return $();
  }
  function g() {
    return $();
  }
  function h() {
    return $();
  }
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
