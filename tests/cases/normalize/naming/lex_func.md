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
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const a_1 = $(1);
  $(a_1);
  const tmpIfTest = $();
  if (tmpIfTest) {
    return a_1;
  }
  const a = $(1);
  $(a);
  return a;
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 
 - 4: 1
 - 5: 1
 - 6: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
