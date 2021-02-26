# Preval test case

# func_lex.md

> Normalize > Naming > Func lex
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
let f = function () {
  let a = $(1);
  $(a);
  let a$1 = $(1);
  $(a$1);
  const tmpIfTest = $();
  if (tmpIfTest) {
    return a$1;
  }
  return a;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const a = $(1);
  $(a);
  const a$1 = $(1);
  $(a$1);
  const tmpIfTest = $();
  if (tmpIfTest) {
    return a$1;
  }
  return a;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 
 - 6: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
