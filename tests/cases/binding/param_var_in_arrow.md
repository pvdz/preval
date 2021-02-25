# Preval test case

# param_var_in_arrow.md

> Binding > Param var in arrow
>
> Param that also has a var in same scope. Prettier (minified) does this.

#TODO

## Input

`````js filename=intro
const f = (a) => {
  var a = $(10);
  return a;
}
$(f());
`````

## Normalized

`````js filename=intro
const f = (a$1) => {
  a$1 = $(10);
  return a$1;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = (a$1) => {
  const SSA_a$1 = $(10);
  return SSA_a$1;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
