# Preval test case

# import_default_anon_func.md

> Import > Import default anon func
>
> Import statements need special care in our system and our tests

The code frames should have a filename that matches the exact string that is used in imports. And just work.

Their name should also be `'*default*'`, and we have no alternative transform available for this.

#TODO

## Input

`````js filename=intro
import x from 'x';
$(x());
$(x.name);
`````

`````js filename=x
export default function() {
  return 100;
};
`````

## Normalized

`````js filename=intro
import { default as x } from 'x';
const tmpCallCallee = $;
const tmpCalleeParam = x();
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = x.name;
tmpCallCallee$1(tmpCalleeParam$1);
`````

`````js filename=x
export default function () {
  return 100;
}
`````

## Output

`````js filename=intro
import { default as x } from 'x';
const tmpCalleeParam = x();
$(tmpCalleeParam);
const tmpCalleeParam$1 = x.name;
$(tmpCalleeParam$1);
`````

`````js filename=x
export default function () {
  return 100;
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot use import statement outside a module ]>')

Normalized calls: Same

Final output calls: Same
