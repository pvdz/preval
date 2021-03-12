# Preval test case

# arglen3.md

> Normalize > Arguments > Arglen3
>
> This was causing a problem when arguments was passed on in a call.

#TODO

## Input

`````js filename=intro
const f = function() {
  $(arguments.length);
}
f();
`````

## Normalized

`````js filename=intro
const f = function () {
  const tmpCallCallee = $;
  const tmpCalleeParam = arguments.length;
  tmpCallCallee(tmpCalleeParam);
};
f();
`````

## Output

`````js filename=intro
const f = function () {
  const tmpCalleeParam = arguments.length;
  $(tmpCalleeParam);
};
f();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
