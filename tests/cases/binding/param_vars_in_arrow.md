# Preval test case

# param_vars_in_arrow.md

> Binding > Param vars in arrow
>
> Param that also has a var in same scope. Prettier (minified) does this.

#TODO

## Input

`````js filename=intro
const f = (a) => {
  var a = $(10), b = $(20);
  return [a, b];
}
$(f());
`````

## Normalized

`````js filename=intro
const f = (a$1) => {
  let b$1 = undefined;
  a$1 = $(10);
  b$1 = $(20);
  const tmpReturnArg = [a$1, b$1];
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = () => {
  const SSA_a$1 = $(10);
  const SSA_b$1 = $(20);
  const tmpReturnArg = [SSA_a$1, SSA_b$1];
  return tmpReturnArg;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: [10, 20]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
