A normalized ast would be a nested set of statements, a sort of subset of the regular JS ast.
It would be target JS as an output language even though the ast does not match that specifically.

Program >
    body: Block

Statement >
    AssignmentIdentStatement
    AssignmentPropStatement
    AssignmentComputedPropStatement
    BlockStatement
    BreakStatement
    CallStatement
    ConstStatement
    EmptyStatement
    ExportNamedDeclaration (?)
    ExpressionStatement
    ForInStatement
    ForOfStatement
    IfStatement
    ImportDeclaration (?)
    LabelStatement
    LetStatement
    ReturnStatement
    ThrowStatement
    TryStatement
    WhileStatement

AssignmentIdentStatement >
    left: identifier
    right: Expression

AssignmentPropStatement >
    obj: SimpleExpression
    prop: string
    right: Expression

AssignmentComputedPropStatement >
    obj: SimpleExpression
    prop: SimpleExpression
    right: Expression

BlockStatement >
    body: Statement[]

BreakStatement >
    label?: string

EmptyStatemnt >
    -

ExportNamedDeclaration >
    ? TODO

ForInStatement >
    name: Ident
    right: Simple

ForOfStatement >
    name: Ident
    right: Simple

IdentStatement >
    name: string

LabelStatement >
    label: string
    body: Block, While

ReturnStatement >
    expression: SimpleExpression

ThrowStatement >
    expression: SimpleExpression

TryStatement >
    body: BlockStatement
    id: Identifier
    trap: BlockStatement

ConstStatement >
    id: Identifier,
    init: Expression

LetStatement >
    id: Identifier
    init: Expression

WhileStatement >
    test: SimpleExpression
    body: BlockStatement

ExpressionStatement >
    Expression
    AssignIdentExpression
    AssignPropExpression


Expression >
    SimpleExpression
    OtherExpression
    CallIdentExpression
    CallMethodExpression
    CallComputedMethodExpression
    AwaitExpression
    YieldExpression
    MemberExpression
    MemberComputedExpression
    UnaryExpression
    BinaryExpression
    ArrayLiteral
    ObjectLiteral
    JS

SimpleExpression >
    Identifier
    Primitive

Primitive >
    type: number, true, false, undefined, null, NaN, Infinity

AssignIdentExpression >
    name: Identifier,
    value: Expression

AssignPropExpression >
    obj: SimpleExpression
    prop: string
    value: SimpleExpression

AssignComputedPropExpression >
    obj: SimpleExpression
    prop: SimpleExpression
    value: SimpleExpression

Identifier >
    name: string but not Primitive.type

CallIdentExpression >
    callee: SimpleExpression
    args: Array<SimpleExpression>

CallMethodExpression >
    calleeObject: SimpleExpression
    calleeProp: string
    args: Array<SimpleExpression>

CallComputedMethodExpression >
    calleeObject: SimpleExpression
    calleeProp: SimpleExpression
    args: Array<SimpleExpression>

AwaitExpression >
    arg: SimpleExpression

YieldExpression >
    arg: SimpleExpression

FunctionExpression >
    name?: Identifier
    params: Param[]
    async: boolean
    generator: boolean
    body: BlockStatement (? or separate program and function blocks?)

MemberExpression >
    object: SimpleExpression
    prop: string

MemberComputedExpression >
    object: SimpleExpression
    prop: SimpleExpression

UnaryExpression >
    op: ~ ! + - typeof delete (void?)
    prop: SimpleExpression
        if op=delete then prop can be a MemberExpression

BinaryExpression >
    op: + - % ^ etc
    left: SimpleExpression
    right: SimpleExpression

ArrayLiteral >
    // (elements may have holes, those are null in the AST/PST)
    elements: (null, SimpleExpression, SpreadElement)[]

SpreadElement >
    arg: SimpleExpression

ObjectLiteral >
    props: (Prop, PropComputed, PropSpread)[]

property >
    name: Ident
    value: SimpleExpression
    isComputed: boolean

method >
    name: Ident
    isComputed: boolean
    isAsync: boolean
    isGenerator: boolean // is this even possible?
    func: FunctionExpression

PropComputed >
    name: SimpleExpression
    value: SimpleExpression

PropSpread >
    arg: SimpleExpression

JS >
    ast: <normal AST>

ClassExpression >
    name?: Identifier
    extends?: SimpleExpression
    body: ClassBody

RegexLiteral >
    full
    pattern
    flags
