# Preval test case

# elim.md

> Normalize > Try > Finally > Elim
>
> Can we safely eliminate finally?

Narrator: no.

#TODO

## Input

`````js filename=intro
function f() {
  try {
    $(1);
    fail;
    $('fail');
  } finally {
    $(3);
  }
  $('fail2');
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  try {
    $(1);
    fail;
    $('fail');
  } finally {
    $(3);
  }
  $('fail2');
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  try {
    $(1);
    fail;
    $('fail');
  } finally {
    $(3);
  }
  $('fail2');
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
try {
  $(1);
  fail;
  $('fail');
} finally {
  $(3);
}
$('fail2');
$(undefined);
`````

## Globals

BAD@! Found 1 implicit global bindings:

fail

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
