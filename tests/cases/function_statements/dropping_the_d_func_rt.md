# Preval test case

# dropping_the_d_func_rt.md

> Function statements > Dropping the d func rt
>
> Investigate why the d() function is dropped

Source: https://www.trickster.dev/post/javascript-obfuscation-techniques-by-example/

Afterwards, check if the last example (jsfk) works now. Otherwise fix that too.

--> function statements should be treated as decls and hoisted to the 
top of their func owner scope before further treatment. spec be damned

Note: THIS_IS_DA____ used to get renamed because preval would see the ident
      already used as an implicit global, but would not consider it referencing
      the declared func statement. So it renamed the func, as it would to dedupe.

The fix was to make sure function statements got hoisted to the top of the func
scope in the pre-normalization step.

## Options

- refTest

## Input

`````js filename=intro
function g() {
  $('always here');
}

function f() {
  {
    function THIS_IS_DA____() {
      $('hello');
    }
  }
  $(THIS_IS_DA____());
}
$(f);
`````

## Output

(Annotated with pids)

`````filename=intro
let f___4__ = function () /*6*/ {
  let THIS_IS_DA_______10__ = function () /*12*/ {
    $(`hello`);
  };
  $(THIS_IS_DA_______30__());
};
let g___40__ = function () /*42*/ {
  $(`always here`);
};
$(f___55__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
f:
  - w @4       | ########## | 55          | none           | none
  - r @55      | 4

THIS_IS_DA____:
  - w @10          | ########## | 30          | none           | none
  - r @30          | 10

tmpCallCallee:
  - w @24          | ########## | 33          | none           | none
  - r @33          | 24

tmpCalleeParam:
  - w @28          | ########## | 34          | none           | none
  - r @34          | 28

g:
  - w @40          | ########## | not read    | none           | none
