# Preval test case

# return_num.md

> Pcode > Return num

## Options

- pcode

## Input

`````js filename=intro
function f(a) {
  return 500;
}

$(f(1));
$(f(2));
$(f('a'));
$(f(true));
`````


## Pcode output


`````fileintro
f =
    [ r0 = $$0 - ]
    [ return - 500 ]
`````




## Todos triggered


None


## Pcode result


Running function "f":

                                    pcode          =>   eval
 - `f()`                       => `500`            => `500`             Ok
 - `f(undefined)`              => `500`            => `500`             Ok
 - `f(null)`                   => `500`            => `500`             Ok
 - `f(true)`                   => `500`            => `500`             Ok
 - `f(false)`                  => `500`            => `500`             Ok
 - `f("")`                     => `500`            => `500`             Ok
 - `f("preval")`               => `500`            => `500`             Ok
 - `f(0)`                      => `500`            => `500`             Ok
 - `f(1)`                      => `500`            => `500`             Ok
 - `f(0, 0)`                   => `500`            => `500`             Ok
 - `f(0, 1)`                   => `500`            => `500`             Ok
 - `f(1, 0)`                   => `500`            => `500`             Ok
 - `f(1, 1)`                   => `500`            => `500`             Ok
 - `f(1)`                      => `500`            => `500`             Ok
 - `f(2)`                      => `500`            => `500`             Ok
 - `f("a")`                    => `500`            => `500`             Ok
 - `f(true)`                   => `500`            => `500`             Ok
