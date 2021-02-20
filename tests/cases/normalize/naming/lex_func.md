# Preval test case

# lex_func.md

> Normalize > Naming > Lex func
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
  let a$1 = $(1);
  $(a$1);
  const tmpIfTest = $();
  if (tmpIfTest) {
    return a$1;
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
  const a$1 = $(1);
  $(a$1);
  const tmpIfTest = $();
  if (tmpIfTest) {
    return a$1;
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
